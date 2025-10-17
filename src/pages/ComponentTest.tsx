import React from 'react';
import { Button, Card, Input } from '../components/ui';

const ComponentTest: React.FC = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Component Test</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <Button variant="primary">Test Button</Button>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <Card className="test-card">
          <p>Test Card Content</p>
        </Card>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <Input 
          label="Test Input"
          placeholder="Enter something..."
        />
      </div>
    </div>
  );
};

export default ComponentTest;