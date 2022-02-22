import React, {useState} from 'react';

export function OrderTypeSelector(props) {
    //set currnetSelected using usestate
    // Sorting names
    const orderTypes= ['Random', 'InOrder', 'Almost', 'Reverse',];
    return (<div>  
        {
            orderTypes.map((name) => {
                            {/*click function it will check what sorting method is clicked */}
    
                return <div style={{cursor : "pointer"}}>
                    {props.cur === name ? <p style={{fontWeight : "bold"}} onClick={()=>{props.setter(name)}}>{name} Array</p>
            : <p onClick={()=>{props.setter(name)}}>{name} Array</p>}</div>
                
            }
            )
        }
    </div>)
} 