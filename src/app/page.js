import Image from "next/image";
import InteractiveMap from "./components/InteractiveMap";
import CoordinateMapper from "./components/MappingTool";

export default function Home() {
  return (
    <div>
      <InteractiveMap/>
      {/* <CoordinateMapper/> */}
    </div>
  );
}
