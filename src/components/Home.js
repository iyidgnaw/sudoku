import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';



function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const id = uuidv4();
    navigate(`/game/${id}`);
  }, [navigate])

  return <div>Generating New Game...</div>
}

export default Home;