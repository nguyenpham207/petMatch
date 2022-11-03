import React, { useEffect, useState } from 'react' 
import { Container, Row, Col , Card, Button} from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'
import { petDelete, petShow } from '../../api/pet'
import EditPetModal from './EditPetModal'
import UploadPetPicture from './UploadPetPictureModal'
import EditMeetModal from './EditMeetModal'
import ShowMeet from './ShowMeet'


const cardContainerLayout = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

const PetShow = ({ user, msgAlert }) => {

    const [pet, setPet] = useState({})
    const [editModalShow, setEditModalShow] = useState(false)
    const [meetModalShow, setMeetModalShow] = useState(false)
    const [uploadPictureShow, setUploadPictureShow] = useState(false)
    const [updated, setUpdated] = useState(false)
    const [deleted, setDeleted] = useState(false)
    
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        petShow(user, id)
        .then((res) => {
            setPet(res.data.pet)
            console.log("this is the id", id)
        })
        .catch((error) => {
            msgAlert({
                heading: 'Failure',
                message: 'Show Pet Failure' + error,
                variant: 'danger'
            })
        })
    },[updated] )

   
    const dogPic = require('../shared/images/defaultDog.png')
	const catPic = require('../shared/images/defaultCat.png')
	
	const setImage = (type)=>{
        if(!pet.img){
		    if(type === "DOG"){
			    return <img fluid  src={dogPic} />
		    }else{
			    return <img fluid  src={catPic} />
		    }
        }else{
            return   <img fluid style={{width:'300px', height:'300px'}} src={pet.img} />
       }
	}
    const handleDeletePet = () => {
        petDelete(user, id)
        .then(() => {
            setDeleted(true)
            msgAlert({
                heading: 'Success',
                message: 'You Deleted Your Pet Profile',
                variant: 'success'
            })
            
        })
        .catch((error) => {
            msgAlert({
                heading: 'Uh-oh',
                message: 'Your Pet Profile is Still Here' + error,
                variant: 'danger'
            })
        })
    }


    let meetCards
    if (pet) {
        if (pet.meets.length > 0) {
            meetCards = pet.meets.map(meet => (
                <ShowMeet
                    key={meet._id}
                    meet={meet}
                    pet={pet}
                />
            ))    
    }
}

    // oneliner
    if (deleted) navigate('/petmatch')

    return (
			<>
				<Container className='mt-5 mx-auto'>
                   
                    <Row className=''>
                    <Col xl={1}>
                        </Col>
                        <Col className='mx-auto mt-5'>
                      
                        {setImage(pet.typeOfPet)}
                        
                        <Card.Body>
                           { 
                             pet.owner && user && pet.owner._id === user._id 
                                ?
                            <Row>
                            <Button onClick={() => setEditModalShow(true)} className="m-2" variant="info">
                                Edit {pet.name}'s Profile
                            </Button>
                            <Button onClick={() => navigate(`/image/${pet._id}`)} className="m-2" variant="secondary">
                                Edit {pet.name}'s Picture
                            </Button>
                            
                            
                            <Button onClick={() => handleDeletePet()}
                                className="m-2"
                                variant="danger"
                            >
                               Delete { pet.name }'s Profile
                            </Button>
                        
                        </Row>
                        :
                        null
                    }
                    </Card.Body>
                        </Col>
                        <Col xl={6}>
                        <Container fluid style={{width:"100%"}}>
                        <Card className='mt-5'>
                        <Card.Header><h1 style ={{color:'#eb50b8'}}>Hi! My name is {pet.name}</h1> </Card.Header>
                       <Card.Body>
                            <h3>I am a {pet.typeOfPet}, more specifically I am a {pet.breed}!</h3>
                            <h4>Likes: {pet.likes}</h4>
                        </Card.Body> 
                        <Col xl={1}>
                        </Col>
                        
                        <div className="footer">
                        <Card.Footer>
                        <div>
                                Available for a play date: { pet.available ? 'yes' : 'no' }
                        </div><br/>
                        <div>
                        <Button onClick={() => setMeetModalShow(true)} className="m-2" variant="info">
                                Let's go!
                            </Button>
                        </div>
                        </Card.Footer>
                        </div>
                        </Card>
                        </Container>
                        <Col>
                        <Container style={cardContainerLayout}>
                            {meetCards}
                        </Container>
                        </Col>
                        </Col>
                        <Col>
                        <EditPetModal 
                            user={user}
                            pet={pet}
                            show={editModalShow}
                            msgAlert={msgAlert}
                            triggerRefresh={() => setUpdated(prev => !prev)}
                            handleClose={() => setEditModalShow(false)}/>
                        </Col>
                        <Row>
                        <Col>
                        <EditMeetModal 
                            user={user}
                            pet={pet}
                            show={meetModalShow}
                            msgAlert={msgAlert}
                            triggerRefresh={() => setUpdated(prev => !prev)}
                            handleClose={() => setMeetModalShow(false)}/>
                        </Col>
                        <Col>
                        <UploadPetPicture 
                            user={user}
                            pet={pet}
                            show={uploadPictureShow}
                            msgAlert={msgAlert}
                            triggerRefresh={() => setUpdated(prev => !prev)}
                            handleClose={() => setUploadPictureShow(false)}/>
                        </Col></Row>
                        
                    </Row>
                    </Container>
                
			</>
		)
}

export default PetShow