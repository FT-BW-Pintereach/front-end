# Pintereach
An app that lets user create an account and login, browse through trending news articles of the day, and add them to user created and editable folders for later viewing.

*Built using React.js, Context, Reducer, NewsAPI, and private routes with user auth through JWT.*

Features:
<ul>
  <li>CRUD app that allows user to create, edit and delete custom folders to save articles</li>
  <li>User board displays all folder categories as well as 'favorites' carousel</li>
  <li>Allows users to view list of trending articles through NewsAPI and visit source site</li>
  <li>Allows users to add articles to their custom folders through a dropdown button on the article card</li> 
  <li>Once user navigates into a folder, they can delete the article from it, or navigate to source site</li>
</ul>

Known Issues:
<ul>
  <li>Articles no longer dispaly due to NewsAPI policy change - free keys blocked on deployed sites</li>
  <li>Back end storage of custom folders gets users mixed up</li>
  <li>Favorites button not functional</li>
</ul>

