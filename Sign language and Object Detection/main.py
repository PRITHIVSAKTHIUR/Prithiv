import cv2
import cvlib as cv
from cvlib.object_detection import draw_bbox
from vidgear.gears import CamGear

# Set the desired frame size
frame_width = 1000
frame_height = 600

# Start video stream from YouTube link
stream = CamGear(source='https://youtu.be/MHVNzIfsLVU', stream_mode=True, logging=True).start()

while True:
    # Read frames from the video stream
    frame = stream.read()

    # Resize the frame
    frame = cv2.resize(frame, (frame_width, frame_height))

    # Detect objects in the frame
    bbox, label, conf = cv.detect_common_objects(frame)

    # Draw bounding boxes and labels on the frame
    output_frame = draw_bbox(frame, bbox, label, conf)

    # Display the frame with bounding boxes
    cv2.imshow("Object Detection", output_frame)

    # Break the loop if 'q' is pressed
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release the video stream and close windows
stream.stop()
cv2.destroyAllWindows()
