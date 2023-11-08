import { DatePicker } from 'antd';
import { Moment } from 'moment';
import momentGenerateConfig from 'rc-picker/lib/generate/moment';

const MomentPicker = DatePicker.generatePicker<Moment>(momentGenerateConfig);

export default MomentPicker;
