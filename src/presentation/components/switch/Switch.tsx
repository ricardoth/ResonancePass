import './Switch.css';

interface SwitchProps {
    isOn: any;
    onToogle: any;
    id: any;
}

export const Switch : React.FC<SwitchProps> = ({isOn, onToogle, id}) => {
    const handleChange = () => {
        const customEvent = {
            target: {
                name: id,
                value: !isOn
            }
        };
        onToogle(customEvent);
    }
    return (
        <>
            <input
                id={id}
                checked={isOn}
                onChange={handleChange}
                className="react-switch-checkbox"
                type="checkbox"
            />
            <label
                style={{ background: isOn && '#06D6A0' }}
                className="react-switch-label"
                htmlFor={id}
            >
                <span className={`react-switch-button`} />
            </label>
        </>
    )
}
