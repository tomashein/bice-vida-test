import { useEffect, useState } from 'react';
import Client from '@utils/client';
import Button from '@components/button';
import Card from '@components/card';
import Select from '@components/select';
import { formatCurrency } from '@utils/currency';

const insurancePlans = [
  { label: 'Seguro Vida Activa', value: 58 },
  { label: 'Seguro Viaje Protegido', value: 59 }
];

const App = () => {
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState('');
  const [insurance, setInsurance] = useState(null);

  const onSelectChange = (e) => {
    setSelected(e.target.value);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await Client.get(`/insurance/${selected}`);
      const obj = { ...data.insurance, price: formatCurrency(data.insurance.price, 'es-CL', 'CLP') };
      setInsurance(obj);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setInsurance(null);
  }, [selected]);

  return (
    <div className="flex flex-col items-center">
      <div className="mt-4" style={{ width: '340px' }}>
        <Select
          className="mr-4"
          disabled={loading}
          label={selected !== '' ? 'Seguro' : 'Selecciona..'}
          name="select"
          onChange={onSelectChange}
          options={insurancePlans}
          value={selected}
        />
        <Button disabled={loading || selected === ''} onClick={fetchData}>Ver</Button>
        {insurance && (
          <Card
            className="mt-4"
            image={insurance.image}
            tag={insurance.price}
            title={insurance.name}
            description={insurance.description}
          />
        )}
      </div>
    </div>
  );
};

export default App;
