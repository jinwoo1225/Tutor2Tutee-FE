import React, { useState } from 'react';

function ClassForm(){
    const [classtype, setClassType] = useState("")
    const [category, setCategory] = useState("")
    const [studyAbout, setStudyAbout] = useState("")
    const [className, setClassName] = useState("")
    const [price, setPrice] = useState("")

    const onClassTypeChange = e => { setClassType(e.target.value) }
    const onCategoryChange = e => { setCategory(e.target.value) }
    const onStudyAboutChange = e => { setStudyAbout(e.target.value) }
    const onClassNameChange = e => { setClassName(e.target.value) }
    const onPriceChange = e => { setPrice(e.target.value) }
    return(
        <>
            <h1>This is ClassForm</h1>
            <form onSubmit={() => console.log({classtype, category, studyAbout, className, price})}>
                <p>Hello this is Class form<br/>Please form this sheet</p>
                <input text={classtype} placeholder='classtype' onChange={onClassTypeChange}/>
                <input text={category} placeholder='category'  onChange={onCategoryChange}/>
                <input text={studyAbout} placeholder='studyAbout'onChange={onStudyAboutChange}/>
                <input text={className} placeholder='className' onChange={onClassNameChange}/>
                <input text={price} placeholder='price'     onChange={onPriceChange}/>
                <button>Submit</button>
            </form>
        </>
    )
}

export default ClassForm;

// classType, category,
// studyAbout, className
// price
