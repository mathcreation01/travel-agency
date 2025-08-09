import React from 'react'
import {Header} from "../../../components";

const Trips = () => {
  return (
    <main className="all-users wrapper">
            <Header
                title="Trips"
                description="View and Manage Trips"
                ctaText="Create Trip"
                ctaLink="/trips/create"
            />
    </main>
  )
}

export default Trips
