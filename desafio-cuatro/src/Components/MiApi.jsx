import { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';
import '../index.css'
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';

const MiApi = () => {
    const [list, setList] = useState([]);
    const [filter, setFilter] = useState([]);
    const [search, setSearch] = useState("");

    const getData = async () => {
        const url = "https://pokeapi.co/api/v2/pokedex/2/";
        const res = await fetch(url);
        const data = await res.json();
        setList(data.pokemon_entries);
        setFilter(data.pokemon_entries);
    }
    const filtPokemon = () => {
        const filter = list.filter((pokemon) => {
            return (pokemon.pokemon_species.name).toUpperCase().includes(search.toUpperCase());
        });
        setFilter(filter);    
    };

    useEffect(() => {
        filtPokemon();
    }, [search]);

    useEffect(() => {
        getData();
    }, []);

    const datesValidation = (e) => {
        e.preventDefault();
    }
    return (
        <div className="bg-success">
            <nav>
                <Navbar bg="dark" variant='dark' expand="lg">
                    <Container fluid>
                        <Navbar.Brand href="#" className='text-warning'>Pokedex de Kanto</Navbar.Brand>
                        <Form className="d-flex" onSubmit={datesValidation}>
                            <label className='text-light pt-1'>Buscar por nombre de pokemon</label>
                            <Form.Control
                                onChange={(e) => setSearch(e.target.value)}
                                type="search"
                                placeholder="ej: charmander"
                                className="me-2"
                                aria-label="Search" />
                        </Form>
                    </Container>
                </Navbar>
            </nav>
            <main className="card-grid">
                {filter.map((pokemon) => (
                    <div key={pokemon.entry_number} className="p-2">
                        <Card className="bg-dark text-light flex">
                            <Card.Img variant="top" className="img-size" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.entry_number}.png`} />
                            <Card.Body>
                                <Card.Title className="text-center">{pokemon.pokemon_species.name}</Card.Title>
                                <Card.Text>
                                    Número en la pokedex: {pokemon.entry_number}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </main>
        </div>
    )
}

export default MiApi;