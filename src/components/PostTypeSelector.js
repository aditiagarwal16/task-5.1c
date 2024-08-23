import React, { useState } from 'react';
import { Form, Radio, Segment, Header, TextArea, Button } from 'semantic-ui-react';

const PostTypeSelector = () => {
  const [postType, setPostType] = useState('');

  return (
    <Segment>
      <Header as='h3' attached='top' block>
        New Post
      </Header>
      <Segment basic>
        <Form>
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
                style={{ marginLeft: '20px' }} // Adds space between radio buttons
              />
            </Form.Field>
          </Form.Group>
        </Form>
      </Segment>

      {postType === 'question' && (
        <Segment>
          <Header as='h4' attached='top' block>
            What do you want to ask or share
          </Header>
          <Segment basic>
            <p>This section is designed based on the type of the post. It could be developed by conditional rendering. <span style={{color: 'red'}}>For post a question, the following section would be appeared.</span></p>
            <Form>
              <Form.Group inline>
                <label>Title</label>
                <Form.Input placeholder='Start your question with how, what, why, etc.' width={12} />
              </Form.Group>
              <Form.Field>
                <label>Describe your problem</label>
                <TextArea placeholder='Describe your problem' style={{ minHeight: 150 }} />
              </Form.Field>
              <Form.Group inline>
                <label>Tags</label>
                <Form.Input placeholder='Please add up to 3 tags to describe what your question is about e.g., Java' width={12} />
              </Form.Group>
              <Button type='submit' color='grey'>Post</Button>
            </Form>
          </Segment>
        </Segment>
      )}

      {postType === 'article' && (
        <Segment>
          <Header as='h4' attached='top' block>
            What do you want to ask or share
          </Header>
          <Segment basic>
            <p>This section is designed based on the type of the post. It could be developed by conditional rendering. <span style={{color: 'red'}}>For post an article, the following section would be appeared.</span></p>
            <Form>
              <Form.Group inline>
                <label>Title</label>
                <Form.Input placeholder='Enter a descriptive title' width={12} />
              </Form.Group>
              <Form.Field>
                <label>Abstract</label>
                <TextArea placeholder='Enter a 1-paragraph abstract' style={{ minHeight: 100 }} />
              </Form.Field>
              <Form.Field>
                <label>Article Text</label>
                <TextArea placeholder='Enter the full article text' style={{ minHeight: 150 }} />
              </Form.Field>
              <Form.Group inline>
                <label>Tags</label>
                <Form.Input placeholder='Please add up to 3 tags to describe what your article is about e.g., Java' width={12} />
              </Form.Group>
              <Button type='submit' color='grey'>Post</Button>
            </Form>
          </Segment>
        </Segment>
      )}
    </Segment>
  );
};

export default PostTypeSelector;

