import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import SearchUsers from '../components/SearchUsers';
import { Container, Row, Col } from 'react-bootstrap';

const SearchBar = ({onClickFunction}) => {
    const [searchQuery, setSearchQuery] = useState('');

    const onChangeSearch = query => setSearchQuery(query);

    return (
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Search Friend</Form.Label>
          <Form.Control type="username" placeholder="username" />
        </Form.Group>
      <Button variant="primary" type="submit" onClick={SearchUsers}>
        Search
      </Button>
  </Form>
    );
};

export default SearchBar;
