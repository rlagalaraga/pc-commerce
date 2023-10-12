import React from 'react'
import {useParams} from 'react-router-dom'
import ProductHero from '../components/ProductHero'
import ProductCards from '../components/ProductCards'

export const Products = () => {
  const { productType } = useParams()
  return (
    // <div>{productType}</div>
    <>
      <ProductHero></ProductHero>
      <ProductCards></ProductCards>
    </>
  )
}

export default Products