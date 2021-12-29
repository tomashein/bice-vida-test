import { useEffect, useState } from 'react';
import Client from '@utils/client';
import Button from '@components/button';
import Card from '@components/card';
import Select from '@components/select';
import { formatCurrency } from '@utils';
import Spinner from '@components/spinner';

const insurancePlans = [
  { label: 'Seguro Vida Activa', value: 58 },
  { label: 'Seguro Viaje Protegido', value: 59 }
];

const App = () => {
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState('');
  const [insurance, setInsurance] = useState(null);

  useEffect(() => {
    setInsurance(null);
  }, [selected]);

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

  return (
    <div className="flex flex-col items-center p-4">
      <div className="border p-4 rounded-md w-96">
        <div className="mb-2 text-sm font-semibold">Select Action</div>
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
        {loading && (
          <Spinner className="mt-16 mb-14 mx-auto" />
        )}
        {insurance && !loading && (
          <>
            <div className="mt-4 text-sm font-semibold">Fixed Card</div>
            <Card
              className="mt-2"
              image={insurance.image}
              tag={insurance.price}
              title={insurance.name}
              description={insurance.description}
              width="328px"
              height="272px"
              imageStyle={{ height: '192px' }}
            />
            <div className="mt-4 text-sm font-semibold">Responsive Card</div>
            <Card
              className="mt-2"
              image={insurance.image}
              tag={insurance.price}
              title={insurance.name}
              description={insurance.description}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default App;
