import {IconType} from "react-icons";

interface AdminNavItemProps {
    selected?: boolean;
    icon: IconType;
    label: string;
}
const AdminNavItem: React.FC<AdminNavItemProps> = ({
    selected,
    icon: Icon,
    label,
}) => {
    return <div className={`flex items-center justify-center text-center gap-1 p-2 border-b-2 hover:text-green-500 transition cursor-pointer
    ${selected ? 'border-b-green-500 text-green-500' : 'border-transparent text-green-800'}`}>
        <Icon size={20}/>
        <div className="font-medium text-sm text-center break-normal">{label}</div>
    </div>
}
export default AdminNavItem;