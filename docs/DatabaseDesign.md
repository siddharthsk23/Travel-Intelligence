# Travel Intelligence Database Design

Version 1.0

---

# Users

Stores registered users.

Fields

- id
- full_name
- email
- password_hash
- phone
- profile_picture
- created_at

Relationships

One User
↓

Many Vehicles

Many Trips

Many Reviews

---

# Vehicle Categories

Examples

Bike

Car

Bus

Train

Flight

Rental

---

# Vehicle Types

Bike

- Adventure
- Naked
- Sports
- Cruiser
- Tourer
- Cafe Racer
- Scrambler
- Scooter
- Electric

Car

- Hatchback
- Sedan
- SUV
- Compact SUV
- Luxury SUV
- Luxury Sedan
- MPV
- Pickup
- EV

---

# Manufacturers

Honda

Royal Enfield

KTM

BMW

Toyota

Hyundai

Mahindra

etc.

---

# Vehicle Models

Stores specifications.

Fields

- id
- manufacturer_id
- category
- type
- model_name
- engine_cc
- horsepower
- torque
- weight
- fuel_type
- tank_capacity
- claimed_mileage
- community_mileage
- cruising_speed
- top_speed
- service_interval
- chain_interval
- tyre_pressure
- tyre_life
- image

---

# User Garage

Stores user-owned vehicles.

Fields

- id
- user_id
- vehicle_model_id
- nickname
- current_odometer
- purchase_date
- current_mileage
- insurance_expiry
- puc_expiry
- last_service
- notes

---

# Trips

Fields

- id
- user_id
- source
- destination
- distance
- duration
- vehicle_used
- total_cost
- fuel_cost
- toll_cost
- weather
- created_at

---

# Trip Analytics

Stores actual trip data.

Fields

- trip_id
- average_speed
- actual_mileage
- luggage_weight
- rider_weight
- pillion_weight
- weather
- terrain
- fuel_used

---

# Fuel Logs

Stores every refuel.

Fields

- id
- vehicle_id
- liters
- amount
- odometer
- date

---

# Maintenance

Fields

- id
- vehicle_id
- service_type
- service_date
- odometer
- cost
- next_due

---

# Rentals

Stores rental partners.

Fields

- id
- company
- city
- contact
- website

---

# Rental Vehicles

Stores rental inventory.

Fields

- rental_id
- vehicle_model
- price_per_day
- deposit
- availability

---

# Reviews

Fields

- id
- user_id
- trip_id
- rating
- review
- road_quality
- scenery
- traffic
- safety
- food

---

# Rental Reviews

Fields

- id
- rental_company
- bike_condition
- mileage
- hidden_charges
- cleanliness
- rating

---

# Scenic Places

Fields

- id
- name
- latitude
- longitude
- category
- description

---

# Fuel Stations

Fields

- id
- name
- latitude
- longitude
- brand

---

# AI Chat

Stores chat history.

Fields

- id
- user_id
- prompt
- response
- timestamp

---

# Future Tables

Hotels

Restaurants

EV Chargers

Emergency Contacts

Ride Groups

Weather Cache

Offline Maps