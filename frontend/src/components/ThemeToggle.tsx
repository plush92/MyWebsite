import CustomSwitch from './materialui/CustomSwitch';

interface ThemeToggleProps {
  mode: 'light' | 'dark';
  toggleMode: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ mode, toggleMode }) => (
  <CustomSwitch checked={mode === 'dark'} onChange={toggleMode} />
);

export default ThemeToggle;
