import { Header } from "../components/Header";
import logo from "../../../../assets/logo.svg";

export const Home = () => {
  return (
    <div>
      <Header />
      <div>
        <div>
          <div>
            <img src={logo} alt="Deybipart Logo" />
          </div>
          <div>
            <input type="text" />
          </div>
        </div>
      </div>
    </div>
  );
};
