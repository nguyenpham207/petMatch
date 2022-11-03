import React from 'react'
import { Form, Button, Container } from 'react-bootstrap'
import PetCheckBox from './PetCheckBox'


const PetForm = (props) => {
    // here are the props we're going to bring into our form
    const { pet, handleChange, heading, handleSubmit, handleCheck } = props
    console.log(pet.available)

    // const [checked, setChecked] = React.useState(false);

    // const handleCheck = () => {
    //     setChecked(!checked);
    // }

    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Label>Name:</Form.Label>
                <Form.Control
                    placeholder="what's your pet's name?"
                    name="name"
                    id="name"
                    value={pet.name}
                    onChange={handleChange}
                />
                <Form.Label>Type:</Form.Label>
                <Form.Control
                    placeholder="Cat, Dog, Iguana?"
                    name="typeOfPet"
                    id="typeOfPet"
                    value={pet.typeOfPet}
                    onChange={handleChange}
                />
                <Form.Label>Breed:</Form.Label>
                <Form.Control
                    placeholder="Border Collie, Tabby Cat, Good Boy"
                    name="breed"
                    id="breed"
                    value={pet.breed}
                    onChange={handleChange}
                />
                <Form.Label>Likes:</Form.Label>
                <Form.Control
                    placeholder="What does your pet like to do?"
                    name="likes"
                    id="likes"
                    value={pet.likes}
                    onChange={handleChange}
                />
<<<<<<< HEAD
                <Form.Check
                    // type='switch'
                    label="Are You Able to Meet-up?"
                    name="available"
                    defaultChecked={pet.available}
                    onChange={handleChange}
=======
                {/* <Form.Check 
					// type='switch'
                    label="Are You Able to Meet-up?"
                    name="available"
                    defaultChecked={ pet.available }
                    onChange={ handleChange }
                /> */}
                <PetCheckBox
                    label="Available to meet up"
                    value={pet.available}
                    onChange={handleCheck}
>>>>>>> 74b693dcc6bf794790797b16815e758386eff340
                />
                <p>Is "availability" checked? </p>
                <Button type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default PetForm