import { useState, useEffect } from 'react'
import { useForm, useController } from 'react-hook-form'
import Select from 'react-select';
import axios from 'axios'
import { Disaster } from '../type/disaster.type'
import { dataDisaster } from '../data.json'


type Categories = {
  value: string;
  label: string;
}


const categories: Categories[] = [
  { value: "tornadoes", label: "Tornadoes and Severe Storms" },
  { value: "hurricanes", label: "Hurricanes and Tropical Storms" },
  { value: "floods", label: "Floods" },
  { value: "wildfires", label: "Wildfires" },
  { value: "earthquakes", label: "Earthquakes" },
  { value: "Drought", label: "Drought" },
];


export const AddDisaster = () => {

  const [disasterList, setDisasterList] = useState(dataDisaster)
  // const [disaster, setDisaster] = useState('')

  const form = useForm<Disaster>({
    defaultValues: {
      name: "",
      street1: "",
      street2: "",
      city: "Toronto",
      country: "Canada",
      category: "",
      description: ""
    },
  })

  useEffect(() => {
    localStorage.setItem('DisasterData', JSON.stringify(disasterList))
  }, [])



  const { register, handleSubmit, control, formState } = form;
  const { errors } = formState;
  const { field } = useController({ name: 'category', control })


  const handleSelectChange = (option: Categories | null) => {
    field.onChange(option?.value)
  }

  const onSubmitHandle = (data: Disaster) => {

    const address = data.street1 && '+' && data.street2 && '+Toronto+Ontario+Canada'

    axios.get(`https://geocode.maps.co/search?q=${address}`)
      .then(response => {

        const idNumber: number = Object.keys(dataDisaster).length + 1

        const objectAddress: Disaster = {
          _id: idNumber,
          name: data.name,
          street1: data.street1,
          street2: data.street2,
          latitude: response.data[0].lat,
          longitude: response.data[0].lon,
          city: "Toronto",
          country: "Canada",
          category: data.category,
          description: data.description
        }
        disasterList.push(objectAddress)
        localStorage.setItem('DisasterData', JSON.stringify(disasterList))

        // console.log(response.data)
        // console.log(response.data[0].lat, response.data[0].lon)
        // console.log(dataDisaster)
        // console.log(data.category)
        })
        .catch(errors => {
          console.log(errors)
        })


    form.reset()
    } 

  return (
    <div className="">
      <div className="">Enter new item</div>
      <form className="" onSubmit={handleSubmit(onSubmitHandle)}>
        <div>
          <label htmlFor="name">Disaster name</label>
          <input
            className="text-black border-gray-500"
            type="text"
            id="name"
            {...register('name')}
          />
        </div>

        <div>
          <label htmlFor="street1">First Street</label>
          <input
            className=" text-black border-gray-500"
            type="text"
            id="street1"
            {...register('street1')}
          />
        </div>
        <div>
          <label htmlFor="street2">Second Street</label>
          <input
            className="text-black"
            type="text"
            id="street2"
            {...register('street2')}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input
            className="text-black"
            type="text"
            id="description"
            {...register('description')}
          />
        </div>
        <div>
          <label htmlFor="category">Category</label>
          <Select className=" "
            value={categories.find(({ value }) => value === field.value)}
            onChange={handleSelectChange}
            options={categories}
            id="category"
          />
        </div>

        <div className="input-group-append">
          <button className="btn btn-outline-primary"
            id="click-button"
            type="submit"
          >Add Disaster
          </button>
        </div>
      </form>

      <div className="">Desasters</div>
        {disasterList.map((disaster, index) => {
          return (
            <ul key={index}>
              <li className="" >
                {disaster.name}
              </li>
              <li>
                {disaster.category} 
              </li>
              <li>
                {disaster.street1}
              </li>
              <li>
                {disaster.street2}
              </li>
            </ul>
          )
        })}
    </div>
  )
}



