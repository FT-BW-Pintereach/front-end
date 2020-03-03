import React, { useState, useEffect } from 'react'


function BoardForm(){


    return(
        <div>
            <form>
                <label htmlFor='category'>Select Category</label>
                <input
                    id='category'
                    placeholder='Finance News'
                    name='category'
                    type='text'
                />
                <button>Submit</button>
            </form>
        </div>
    )
}

export default BoardForm

// manage state with reducers between articles and this