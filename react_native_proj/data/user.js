import {images} from '../constants'
import data from './data'

const user = {
    id: 1,
    name: 'Phạm Đình Quang',
    code: '1519012000',
    avatar: images.profile,
    exp: 0,
    desiredJob: 'It Software',
    placeJob: [],
    appliedJob: [data[1], data[2]],
    savedJob: [data[3], data[4]],
    suitabledJob: data
}

export default user