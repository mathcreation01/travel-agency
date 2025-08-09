import {calculateTrendPercentage, cn} from "~/lib/utils";

const StatsCard = ({
                       headerTitle,
                       total,
                       lastMonthCount,
                       currentMonthCount
                   }: StatsCard) => {

    const {trend, percentage} = calculateTrendPercentage(currentMonthCount, lastMonthCount)
    const isDecrement = trend === 'decrement'
    return (


        <article className="stats-card">
            <h3 className="text-base font-medium">{headerTitle}</h3>
            <div className="content">
                <div className="flex flex-col gap-4">
                    <h2 className="text-4xl font-semibold">{total}</h2>
                    <div className="flex items-center gap-2">
                        <figure className="flex items-center gap-1">
                            <img
                                src={`/assets/icons/${isDecrement ? 'arrow-down-red' : 'arrow-up-green'}.svg`}
                                alt="trend" className="size-4"/>

                        </figure>
                        <figcaption className={cn('text-sm', isDecrement ? 'text-red-100'
                            : 'text-success-500')}>{Math.round(percentage)}%</figcaption>
                        <span className="text-xs text-gray-100">vs last month</span>
                    </div>
                </div>

                <img src={`/assets/icons/${isDecrement ? 'decrement.svg' : 'increment.svg' }`}
                     alt="trend" className="xl:w-32 w-full h'full md:h-32 xl:h-full" />
            </div>


        </article>
    )
}
export default StatsCard
