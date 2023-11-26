import NavbarAdmin from './AdminNav';
const MainAdmin = (props) => {
  return (
    <div>
    <NavbarAdmin/>
    {props.child}
  </div>
  );
}
export default MainAdmin;
