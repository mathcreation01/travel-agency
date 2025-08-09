import React from 'react'
import {Header} from "../../../components";
import {GridComponent, ColumnsDirective, ColumnDirective } from "@syncfusion/ej2-react-grids"

import {cn, formatDate} from "~/lib/utils";
import { getAllUsers } from '~/appwrite/auth';
import type { Route } from './+types/all-users';

export const loader = async () => {
    const { users, total } = await getAllUsers(10, 0);
    
    return { users, total };
}

const AllUsers = ({loaderData} : Route.ComponentProps   ) => {
    const { users } = loaderData;
    return (
        <main className="all-users wrapper">
            <Header
                title="Manage Users"
                description="Filter, Edit, and Delete Users"
            />

                <GridComponent dataSource={users} gridLines='None'>
                    <ColumnsDirective>
                        <ColumnDirective field="name" headerText="Name" textAlign="Left"  width={200} 
                        template={
                            (props: UserData) => (
                                <div className="flex items-center gap-2">
                                    <img src={props.imageUrl} alt={props.name} className="w-8 h-8 rounded-full"
                                    referrerPolicy='no-referrer'
                                    />
                                    <span>{props.name}</span>
                                </div>
                            )
                        }/>
                        <ColumnDirective field="email" headerText="Email Address" textAlign="Left"  width={120}/>
                        <ColumnDirective
                    field="joinedAt"
                    headerText="Date Joined"
                    width="140"
                    textAlign="Left"
                    template={({joinedAt}: { joinedAt: string}) => formatDate(joinedAt)}
                />

                 

                <ColumnDirective
                    field="status"
                    headerText="Status"
                    width="100"
                    textAlign="Left"
                    template={
                        ({status}: UserData) => (
                           
                            <article className={cn('status-column', status === 'user' ? 'bg-success-50': 'bg-light-300')}>
                                <div className={cn('size-1.5 rounded-full', status === 'user' ? 'bg-success-500': 'bg-gray-500')} />
                                    <h3 className={cn('font-inter text-xs font-medium', status === 'user' ? 'text-success-700' : 'text-gray-500')}>
                                        {status}
                                    </h3>
                            </article>
                        )
                    }
                />

                </ColumnsDirective>

                </GridComponent>
        </main>
    )
}
export default AllUsers
