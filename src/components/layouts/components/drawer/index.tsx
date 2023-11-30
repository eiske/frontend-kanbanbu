import { Drawer as AntDrawer } from 'antd';
import useUser from '@hooks/use-user';
import MenuArea from '../menu-area';
import MenuFooter from '../menu-footer';

interface Props {
    open: boolean;
    onClose: () => void;
}

const Drawer = ({ onClose, open }: Props) => {
    const { logout } = useUser();
    return (
        <AntDrawer
            placement="left"
            onClose={onClose}
            open={open}
            footer={<MenuFooter logout={logout} />}
            className="custom-drawer-menu"
        >
            <MenuArea onClose={onClose} />
        </AntDrawer>
    );
};

export default Drawer;
