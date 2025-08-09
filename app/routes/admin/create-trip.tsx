import { ComboBoxComponent } from '@syncfusion/ej2-react-dropdowns'
import { Header } from 'components'
import React from 'react'
import type { Route } from './+types/create-trip';
import { comboBoxItems, selectItems } from '~/constants';
import { cn, formatKey } from '~/lib/utils';
import { LayerDirective, LayersDirective, MapsComponent } from '@syncfusion/ej2-react-maps';
import { world_map } from '~/constants/world_map';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { account } from '~/appwrite/client';
import {useNavigate} from "react-router";

export const loader = async () => {
    const response = await fetch('https://restcountries.com/v3.1/all?fields=name,flag,latlng,maps');
    const data = await response.json();

    return data.map((country: any) => ({
        name: country.flag + " " + country.name.common,
        coordinates: country.latlng,
        value: country.name.common,
        openStreetMap: country.maps?.openStreetMap,
    }))
}
const createTrip = ({loaderData} :  Route.ComponentProps ) => {
    const countries = loaderData as Country[]; 
    const [formData, setFormData] = React.useState<TripFormData>({
        country: countries[0].name || '',
        travelStyle: '',
        interest: '',
        budget: '',
        duration: 0,
        groupType: '',
    });
    const [error, setError] = React.useState<string | null>(null);
    const [loading, setLoading] = React.useState<boolean>(false);
    const navigate = useNavigate();

    const countryData = countries.map((country: any) => ({
        text: country.name,
        value: country.value,
    }));
    const mapData = [
        {
            country: formData.country,
            color: '#EA382E',
            coordinates: countries.find((c: Country) => c.name === formData.country)?.coordinates || []
        }
    ]
    const handleSubmit = async ( e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if(
           !formData.country ||
           !formData.travelStyle ||
           !formData.interest ||
           !formData.budget ||
           !formData.groupType
       ) {
           setError('Please provide values for all fields');
           setLoading(false)
           return;
       }

       if(formData.duration < 1 || formData.duration > 10) {
           setError('Duration must be between 1 and 10 days');
           setLoading(false)
           return;
       }
       const user = await account.get();
       if(!user.$id) {
           console.error('User not authenticated');
           setLoading(false)
           return;
       }


        try {
            // Simulate API call
            const response = await fetch('/api/create-trip', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    country: formData.country,
                   numberOfDays: formData.duration,
                   travelStyle: formData.travelStyle,
                   interests: formData.interest,
                   budget: formData.budget,
                   groupType: formData.groupType,
                   userId: user.$id 
                }),
            });

            const result: CreateTripResponse = await response.json();

           if(result?.id) navigate(`/trips/${result.id}`)
           else console.error('Failed to generate a trip')

        } catch (error) {
            console.log('Failed to create trip', error);
        } finally {
            setLoading(false);
        }
    }

    const handleChange = (key: keyof TripFormData, value: string | number) => {
        // Update the form state with the new value
        setFormData((prev) => ({
            ...prev,
            [key]: value,
        }));
    }
  return (
    <main className="flex flex-col gap-10 pb-20 wrapper">
            <Header title="Add a New Trip" description="View and edit AI Generated travel plans" />

         <section className="mt-2.5 wrapper-md">        

            <form className='trip-form' onSubmit={handleSubmit}>
               <div>
                    <label htmlFor='country'>
                        Country
                    </label>
                    <ComboBoxComponent
                        id='country'
                        dataSource={countryData}
                        fields={{ text: 'text', value: 'value' }}
                        className='combo-box'
                        placeholder='Select a country'
                        change={(e: { value: string | undefined }) => {
                            if (e.value) {
                                handleChange('country', e.value)
                            }
                        
                        }}

                        allowFiltering={true}
                        filtering={
                            (e:any) => {
                                const query = e.text.toLowerCase();
                                e.updateData(
                                    countries.filter((country) =>
                                        country.name.toLowerCase().includes(query)).map((country) => ({
                                            text: country.name,
                                            value: country.value,
                                        }))
                                )
                            }
                        }
                    />
               </div>

               <div>
                    <label htmlFor='duration'>
                        Duration (days)
                    </label>
                    <input
                        type='number'
                        id='duration'
                        name='duration'
                        placeholder='Enter duration in days'
                        className='form-input placeholder:text-gray-100'
                        onChange={(e) => handleChange('duration', Number(e.target.value))}
                    />
               </div>

               {selectItems.map((key) => (
                   <div key={key}>
                       <label htmlFor={key}>
                           {formatKey(key)}
                       </label>
                          <ComboBoxComponent
                            id={key}
                            dataSource={comboBoxItems[key].map((item) => ({
                                text: item,
                                value: item,
                            }))}
                            fields={{ text: 'text', value: 'value' }}
                            className='combo-box'
                            placeholder={`Select ${formatKey(key)}`}
                            change={(e: { value: string | undefined }) => {
                            if (e.value) {
                                handleChange(key, e.value)
                            }
                        
                        }}

                        allowFiltering={true}
                        filtering={
                            (e:any) => {
                                const query = e.text.toLowerCase();
                                e.updateData(
                                    comboBoxItems[key].filter((item) =>
                                        item.toLowerCase().includes(query)).map((item) => ({
                                            text: item,
                                            value: item,
                                        }))
                                )
                            }
                        }

                          />
                   </div>
               ))}

                <div>
                    <label htmlFor='location'>
                        Location on the world Map
                    </label>
                    <MapsComponent>
                            <LayersDirective>
                                <LayerDirective
                                    shapeData={world_map}
                                    dataSource={mapData}
                                    shapePropertyPath="name"
                                    shapeDataPath="country"
                                    shapeSettings={{ colorValuePath: "color", fill: "#E5E5E5" }}
                                />
                            </LayersDirective>
                        </MapsComponent>

                </div>


                <div className='bg-gray-200 h-px w-full my-4' />

                {error && (
                    <div className='text-red-500 text-sm mb-4'>
                        <p>{error}</p>
                    </div>
                )}

                <footer className="px-6 w-full">
                        <ButtonComponent type="submit"
                            className="button-class !h-12 !w-full" disabled={loading}
                        >
                            <img src={`/assets/icons/${loading ? 'loader.svg' : 'magic-star.svg'}`} 
                            className={cn("size-5", {'animate-spin': loading})} />
                            <span className="p-16-semibold text-white">
                                {loading ? 'Generating...' : 'Generate Trip'}
                            </span>
                        </ButtonComponent>
                    </footer>
            </form>
         </section>

    </main>
  )
}

export default createTrip
