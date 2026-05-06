import { StatusBar } from 'expo-status-bar';
import ComplaintsScreen from './screens/ComplaintsScreen';

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <ComplaintsScreen />
    </>
  );
}