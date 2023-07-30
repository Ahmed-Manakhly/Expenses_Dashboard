
import classes from './Notification.module.scss';

const Notification = (props) => {
    let specialClasses = '';

    if (props.status === 'error') {
    specialClasses = classes.error;
    }
    if (props.status === 'completed') {
    specialClasses = classes.success;
    }

    const cssClasses = `${classes.notification} ${specialClasses}`;

    return (
        <section className={cssClasses} onAnimationEnd={props.onAnimationEnd}>
            <h2>{props.title}</h2>
            <p>{props.message}</p>
        </section>
    );
};

export default Notification;