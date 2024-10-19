import Restriction from "./_components/Restriction";
import RoleManagement from "./_components/RoleManagement";

const SettingsPage = () => {
  return (
    <div className="w-full bg-muted p-6 rounded-md">
      <Restriction />
      <RoleManagement />
    </div>
  );
};

export default SettingsPage;
