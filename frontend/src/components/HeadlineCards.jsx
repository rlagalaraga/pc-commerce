import React,  {useState, useEffect} from 'react'
import axios from 'axios'
import URL from '../Api-constants'

const baseURL = "http://127.0.0.1:8000/"

export const HeadlineCards = () => {
    const [categories, setCategories] = useState(null)

    useEffect(() => {
        axios.get(URL.get_categories).then(function(res){
            setCategories(res.data)
        })
        .catch(function(error){
            console.log("No categories found!")
        })
      },[])

      useEffect(() => {
        if(categories){
            console.log(categories)
        }
      }, [categories])
    return (
        <div className='bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900'>
            <h1 className='font-bebas font-bold text-6xl px-4 py-10 bg-black text-white text-center'>EXPLORE PRODUCTS</h1>

            <div className='w-full ms-auto pb-4 px-4 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3'>
                {categories &&(
                    <>
                    {categories.map((category) => (
                        <a key={category.id} href={"/products/" + category.name + "/"}>
                            <div className='font-bebas text-white text-xl cardHeadline'>
                                <div className='bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900'>
                                    <img className='w-full h-[250px] object-cover' src={baseURL + category.image} />
                                    <h1 className='text-center bg-black'>{category.name}</h1>
                                </div>
                            </div>
                        </a>
                    ))}
                    </>
                )}
            </div>
        </div>
  )
}

export default HeadlineCards
