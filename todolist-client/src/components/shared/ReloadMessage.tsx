import CachedIcon from "@mui/icons-material/Cached";

interface ReloadMessageProps {
  message?: string;
}

const ReloadMessage = (props: ReloadMessageProps) => {
  const { message } = props;

  const refreshPage = () => {
    window.location.reload();
  };
  return (
    <div onClick={refreshPage}>
      {message ? message : null}
      {"\n"}
      Click here to reload the page <CachedIcon />
    </div>
  );
};

export default ReloadMessage;
