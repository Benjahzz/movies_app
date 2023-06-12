import React from "react"



const uploadImage =  async (data: FormData) => {
    const response = await fetch('https://api.cloudinary.com/v1_1/drjashqlj/image/upload', {
        method: 'POST',
        body: data
    }).then(res => res.json())

    return response
}

export default uploadImage