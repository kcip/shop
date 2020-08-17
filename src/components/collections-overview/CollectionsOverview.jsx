import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import CollectionPreview from '../collectionPreview/CollectionPreview'
import { selectCollectionsForPreview } from '../../redux/shop/shop.selectors'
import './collectionsOverview.scss'

const CollectionsOverview = ({ collections }) => {
 console.log(collections)
 return (
  <div className="collections-overview">
   {collections.map(({ id, ...otherCollectionProps }) => (
    <CollectionPreview key={id} {...otherCollectionProps} />
   ))}
  </div>
 )
}
const mapStateToProps = createStructuredSelector({
 collections: selectCollectionsForPreview
})

export default connect(mapStateToProps)(CollectionsOverview);