import { useDispatch, useSelector } from "react-redux";
import { selectRoutesMap } from "../../sagas/routes/routes.selector";

const Routes = ({ route }) => {
  const { id, name, service } = route;
  console.log(id);
  console.log(name);
  console.log(service);
  let emoji = "🟢";
  if (service === "Good Service") {
    emoji = "🟢";
  } else if (service === "Minor Delays") {
    emoji = "🟡";
  } else if (service === "Major Delays") {
    emoji = "🔴";
  } else if (service === "Planned Works") {
    emoji = "🟠";
  }
  return (
    <div className="route-container" id={id}>
      <span className="emoji">{emoji}</span>
      <span className="name">{name}</span>
      <span className="service">{service}</span>
    </div>
  );
};

export default Routes;
