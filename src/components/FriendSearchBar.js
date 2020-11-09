import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';

const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const onChangeSearch = query => setSearchQuery(query);

    return (
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Search Friend</Form.Label>
          <Form.Control type="email" placeholder="username" />
        </Form.Group>
      <Button variant="primary" type="submit">
        Search
      </Button>
  </Form>
    );
};

export default SearchBar;
