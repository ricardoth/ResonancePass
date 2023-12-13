import { components, OptionProps } from 'react-select';
import './Option.css';

export const Option: React.FC<OptionProps<any, false, never>> = (props: any) => {
    const {data} = props;
    return (
        <components.Option {...props}>
            <div className='option-container'>
                <img 
                    src={data.image}
                    style={{ width: '55px', height: '55px' }} 
                    alt={data.label}
                />
                &nbsp;&nbsp;
                <label>{data.label}</label>
            </div>
        </components.Option>
    )
}