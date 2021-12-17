import { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Dimmer,
    Loader,
    Card,
    Image,
    Container,
    Header,
} from 'semantic-ui-react';

function App() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await axios
                .get('https://react-sandwich-app.herokuapp.com/api/get-data')
                .then((res) => {
                    setData(res.data.data);
                    setLoading(false);
                });
        };
        fetchData();
    }, []);
    return loading ? (
        <Dimmer active={loading}>
            <Loader />
        </Dimmer>
    ) : (
        <Container>
            <Header size='huge' style={{ marginTop: '0.01rem', color: 'red' }}>
                How To Make
            </Header>
            <Header size='small' style={{ marginTop: '0.01rem', color: 'red' }}>
                You can see the API documentation{' '}
                <a
                    href='https://documenter.getpostman.com/view/16812758/UVR5po8C'
                    target='_blank'
                    rel='noreferrer'>
                    here
                </a>
            </Header>
            <Header size='small' style={{ marginTop: '0.01rem', color: 'red' }}>
                You can download the Assignment 1{' '}
                <a
                    href='/Steps to make a delicious Peanut Butter.pdf'
                    download>
                    here
                </a>
            </Header>
            <Card.Group itemsPerRow={3}>
                {data.map((step, key) => (
                    <Card color={step.optional ? 'green' : 'yellow'} key={key}>
                        <Card.Content>
                            <Image
                                src={step.image}
                                size='big'
                                floated='right'
                                rounded
                                style={{
                                    maxWidth: '100%',
                                    height: '200px',
                                    objectFit: 'scale-down',
                                }}
                            />
                            <Card.Header>
                                STEP {step.id} {step.optional && '(Optional)'}
                            </Card.Header>
                            <Card.Description>{step.step}</Card.Description>
                        </Card.Content>
                    </Card>
                ))}
            </Card.Group>
        </Container>
    );
}

export default App;
