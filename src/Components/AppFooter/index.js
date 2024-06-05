import { Typography } from "antd";

function AppFooter() {
  return (
    <div className="appFooter flex gap-6 justify-center items-center bg-white h-8  ">
      <Typography.Link  href="https://www.google.com" target={"_blank"}>
        Privacy Policy
      </Typography.Link>
      <Typography.Link href="https://www.google.com" target={"_blank"}>
        Terms & Conditions
      </Typography.Link>
      <Typography.Link href="https://www.google.com" target={"_blank"}>
        Return Policy
      </Typography.Link>
      <Typography.Link href="tel:+123456789" target={"_blank"}>
        +123456789
      </Typography.Link>
    </div>
  );
}
export default AppFooter;