import Navbaruser from './UserNav';
const Main = (props) => {
  return (
    <div>
      <Navbaruser />
      {props.child}
    </div>
    
  );
}
export default Main;
