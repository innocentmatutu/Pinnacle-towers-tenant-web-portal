import Icon from './Icon';

export default function Placeholder({ title, selectNav }) {
  return (
    <div className="module-placeholder">
      <p className="eyebrow">PINNACLE TOWERS TENANT PORTAL</p>
      <h1>{title}</h1>
      <p>This screen is outside the UI, communication, and global-search scope. The person in charge of the {title.toLowerCase()} module will connect its data, API, and remaining functionality.</p>
      <div>
        <button className="primary-button" onClick={() => selectNav('Messages')}>
          <Icon name="message" size={16} />Contact management
        </button>
      </div>
    </div>
  );
}
