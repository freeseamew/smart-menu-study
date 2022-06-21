import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

const notyf = new Notyf({
  duration: 3000,
  position: {
    x: 'right',
    y: 'top',
  }
});

export default notyf;