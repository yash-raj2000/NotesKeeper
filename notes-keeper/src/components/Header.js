import "../styles.css";
import EventNoteSharpIcon from "@mui/icons-material/EventNoteSharp";

function Header() {
  return (
    <header>
      <h2 className="headerH2">
        <EventNoteSharpIcon fontSize="20px" style={{marginTop:"3px"}} /> NoteSphere : Your thoughts, organized and at your fingertips.
      </h2>
    </header>
  );
}

export default Header;
