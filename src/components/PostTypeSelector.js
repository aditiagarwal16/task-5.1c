import React, { useState } from 'react';
import { Form, Radio, Segment, Header, TextArea, Button, Input } from 'semantic-ui-react';
import { firestore, storage } from '../firebase'; // Correct import for Firestore and Storage from modular Firebase SDK
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'; // Modular Firestore functions
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Modular Storage functions

const PostTypeSelector = () => {
  const [postType, setPostType] = useState('');
  const [title, setTitle] = useState('');
  const [abstract, setAbstract] = useState('');
  const [articleText, setArticleText] = useState('');
  const [tags, setTags] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageURL, setImageURL] = useState('');

  // Handle image file change
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);  // Store the image file
  };

  // Handle image upload to Firebase Storage
  const handleImageUpload = async () => {
    if (image) {
      try {
        // Upload the image to Firebase Storage
        const storageRef = ref(storage, `/articles/${image.name}`);  // Create a reference to the file in Firebase Storage
        await uploadBytes(storageRef, image);  // Upload the file to the reference
        const downloadURL = await getDownloadURL(storageRef);  // Get the download URL of the uploaded file
        setImageURL(downloadURL);  // Save image URL to state
        alert('Image uploaded successfully!');
      } catch (error) {
        alert('Error uploading image: ' + error.message);
      }
    } else {
      alert('Please select an image first.');
    }
  };

  // Handle form submission and save to Firestore
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Prepare the data to be saved in Firestore
      const postData = {
        postType,  // Either 'question' or 'article'
        title,
        abstract,
        articleText,
        tags: tags.split(',').map(tag => tag.trim()),  // Tags as an array
        imageUrl: postType === 'article' ? imageURL : '',  // Store image URL for articles
        createdAt: serverTimestamp(),  // Server timestamp using modular Firebase
      };

      // Save the post data to Firestore
      await addDoc(collection(firestore, 'posts'), postData);

      // Reset form fields after submission
      setTitle('');
      setAbstract('');
      setArticleText('');
      setTags('');
      setImage(null);
      setImageURL('');
      alert('Post submitted successfully!');
    } catch (error) {
      alert('Error submitting post: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Segment>
      <Header as='h3' attached='top' block>
        New Post
      </Header>
      <Segment basic>
        <Form onSubmit={handleSubmit}>
          <Form.Group inline>
            <label>Select Post Type:</label>
            <Form.Field>
              <Radio
                label='Question'
                name='postType'
                value='question'
                checked={postType === 'question'}
                onChange={() => setPostType('question')}
              />
            </Form.Field>
            <Form.Field>
              <Radio
                label='Article'
                name='postType'
                value='article'
                checked={postType === 'article'}
                onChange={() => setPostType('article')}
                style={{ marginLeft: '20px' }}  // Space between radio buttons
              />
            </Form.Field>
          </Form.Group>

          {postType === 'question' && (
            <Segment>
              <Header as='h4' attached='top' block>
                What do you want to ask or share
              </Header>
              <Segment basic>
                <Form.Group inline>
                  <label>Title</label>
                  <Form.Input
                    placeholder='Start your question with how, what, why, etc.'
                    width={12}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Field>
                  <label>Describe your problem</label>
                  <TextArea
                    placeholder='Describe your problem'
                    style={{ minHeight: 150 }}
                    value={articleText}
                    onChange={(e) => setArticleText(e.target.value)}
                    required
                  />
                </Form.Field>
                <Form.Group inline>
                  <label>Tags</label>
                  <Form.Input
                    placeholder='Please add up to 3 tags to describe what your question is about e.g., Java'
                    width={12}
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    required
                  />
                </Form.Group>
              </Segment>
            </Segment>
          )}

          {postType === 'article' && (
            <Segment>
              <Header as='h4' attached='top' block>
                What do you want to ask or share
              </Header>
              <Segment basic>
                <Form.Group inline>
                  <label>Title</label>
                  <Form.Input
                    placeholder='Enter a descriptive title'
                    width={12}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Field>
                  <label>Abstract</label>
                  <TextArea
                    placeholder='Enter a 1-paragraph abstract'
                    style={{ minHeight: 100 }}
                    value={abstract}
                    onChange={(e) => setAbstract(e.target.value)}
                    required
                  />
                </Form.Field>

                {/* Image Upload Section */}
                <Form.Field>
                  <label>Add an image:</label>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Input
                      type="file"
                      onChange={handleImageChange}
                      style={{ flexGrow: 1 }}
                      required={postType === 'article'}
                    />
                    <Button
                      color='grey'
                      onClick={handleImageUpload}
                      style={{
                        marginLeft: '10px',
                        backgroundColor: '#ccc',
                        color: 'black',
                        border: '1px solid #ccc',
                        padding: '10px 20px',
                        borderRadius: '2px',
                      }}
                    >
                      Upload
                    </Button>
                  </div>
                </Form.Field>

                {/* Preview Image */}
                {imageURL && (
                  <div style={{ margin: '10px 0' }}>
                    <img src={imageURL} alt='Uploaded preview' style={{ maxWidth: '100%', height: 'auto' }} />
                  </div>
                )}

                <Form.Field>
                  <label>Article Text</label>
                  <TextArea
                    placeholder='Enter the full article text'
                    style={{ minHeight: 150 }}
                    value={articleText}
                    onChange={(e) => setArticleText(e.target.value)}
                    required
                  />
                </Form.Field>
                <Form.Group inline>
                  <label>Tags</label>
                  <Form.Input
                    placeholder='Please add up to 3 tags to describe what your article is about e.g., Java'
                    width={12}
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    required
                  />
                </Form.Group>
              </Segment>
            </Segment>
          )}
          <Button type='submit' color='grey' loading={loading}>
            Post
          </Button>
        </Form>
      </Segment>
    </Segment>
  );
};

export default PostTypeSelector;
