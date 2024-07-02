import "../styles.css";
import EventNoteSharpIcon from "@mui/icons-material/EventNoteSharp";

function Header() {
  return (
    <header>
      <h2 className="headerH2">
        <EventNoteSharpIcon /> Notes Keeper
      </h2>
    </header>
  );
}

export default Header;
