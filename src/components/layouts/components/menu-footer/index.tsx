import { Button } from 'antd';
import styles from './index.module.css';

interface Props {
    logout: () => void;
}

const MenuFooter = ({ logout }: Props) => (
    <div className={styles.menufooter}>
        <Button
            type="text"
            size="small"
            onClick={logout}
        >
            Sair
        </Button>
    </div>
);

export default MenuFooter;
