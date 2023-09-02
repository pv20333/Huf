import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'antd';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, LabelList } from 'recharts';


function App() {
  const [countPP, setCountPP] = useState(0);
  const [countMaquinas, setCountMaquinas] = useState(0);
  const [countMoldes, setCountMoldes] = useState(0);
  const [countMP, setCountMP] = useState(0);
  const [countSeg, setCountSeg] = useState(0);
  const [chartData, setChartData] = useState([]);

  const monthNames = ["January", "February", "March", "April", "May", "June",
                      "July", "August", "September", "October", "November", "December"];

  const fetchData = async (url, setter) => {
    try {
      const response = await axios.get(url);
      setter(response.data.count);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchChartData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/count/countParametrosByMonth');
      const data = response.data.map(item => ({
        month: monthNames[new Date(item.month).getMonth()],
        count: item.count
      }));
      setChartData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData('http://localhost:8080/api/count/countPP', setCountPP);
    fetchData('http://localhost:8080/api/count/countMaquinas', setCountMaquinas);
    fetchData('http://localhost:8080/api/count/countMoldes', setCountMoldes);
    fetchData('http://localhost:8080/api/count/countMP', setCountMP);
    fetchData('http://localhost:8080/api/count/countSeg', setCountSeg);
    fetchChartData();
  }, []);

  const cardStyle = {
    display: 'flex',
    minHeight: '5vh',
    padding: '2px',
    boxSizing: 'border-box',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  };
  
  return (
    <div style={{ minHeight: '50vh', minWidth: '50vw', padding: '0' }}>
      <Row gutter={[32, 32]} style={{ minHeight: '10vh', margin: '0' }} wrap={true}>
        <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 6 }} lg={{ span: 5 }}>
          <Card style={cardStyle} title="Default Parameters" bordered={false}>
          <div style={{ fontSize: '24px' }}>{countPP}</div>
          </Card>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 6 }} lg={{ span: 5 }}>
          <Card style={cardStyle} title="Machines" bordered={false}>
          <div style={{ fontSize: '24px' }}>{countMaquinas}</div>
          </Card>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 6 }} lg={{ span: 5 }}>
          <Card style={cardStyle} title="Molds" bordered={false}>
          <div style={{ fontSize: '24px' }}>{countMoldes}</div>
          </Card>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 6 }} lg={{ span: 5 }}>
          <Card style={cardStyle} title="Raw Material" bordered={false}>
          <div style={{ fontSize: '24px' }}>{countMP}</div>
          </Card>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 6 }} lg={{ span: 5 }}>
          <Card style={cardStyle} title="Follow-Ups" bordered={false}>
          <div style={{ fontSize: '24px' }}>{countSeg}</div>
          </Card>
        </Col>
      </Row>
      <br />
      <h3>Statistics</h3>
      {chartData.length > 0 && (
        <div style={{ width: '80%', height: 420, margin: '0 auto' }}>
          <BarChart width={600} height={300} data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>

            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" name="Months" fill="#FF0613">
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} />
              ))}
              <LabelList dataKey="count" position="top" />
            </Bar>
          </BarChart>
        </div>  
      )}
    </div>
  );
}

export default App;



