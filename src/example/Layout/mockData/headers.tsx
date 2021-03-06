import * as React from 'react';
import ThumbsUp from 'adp-react-icons/lib/fa/thumbs-o-up';
export const StateLess = () => (<div>I am a Stateless Component <i style={{fontSize:"16px",color:"blue"}}><ThumbsUp/></i></div>);

export const mockHeaders = {
		   simple:          [
			   [
				   {title: 'userName', id: 'userName'},
				   {title: 'email', id: 'email'},
				   {title: 'namefst', id: 'namefst'},
				   {title: 'namelst', id: 'namelst'},
				   {title: 'street1', id: 'street1'},
				   {title: 'street2', id: 'street2'},
				   {title: 'city', id: 'city'},
				   {title: 'state', id: 'state'},
				   {title: 'zip', id: 'zip'},
				   {title: 'country', id: 'country'},
			   ]
		   ],
		   simplewithgroup: [
		   		[
					{title:"User",options:{span:2}},
					{title:"Address",options:{span:8}}
				],
			   [
				   {title: 'userName', id: 'userName'},
				   {title: 'email', id: 'email'},
				   {title: 'namefst', id: 'namefst'},
				   {title: 'namelst', id: 'namelst'},
				   {title: 'street1', id: 'street1'},
				   {title: 'street2', id: 'street2'},
				   {title: 'city', id: 'city'},
				   {title: 'state', id: 'state', options:{headerClass:"align-center",colClass:"align-center"}},
				   {title: 'zip', id: 'zip' , options:{headerClass:"align-center",colClass:"align-center"}},
				   {title: 'country', id: 'country', options:{headerClass:"align-right",colClass:"align-right"}},
			   ]
		   ],
			 simplewithdoublegroup: [
				 [
					 {title:"User",options:{span:2,headerClass:"align-center"}},
					 {title:"Address",options:{span:8,headerClass:"align-center"}}
				 ],
				 [
					 {title: 'userName', id: 'userName'},
					 {title: 'email', id: 'email'},
					 {title: 'namefst', id: 'namefst'},
					 {title: 'namelst', id: 'namelst'},
					 {title: 'street1', id: 'street1'},
					 {title: 'street2', id: 'street2'},
					 {title: 'city', id: 'city'},
					 {title: 'state', id: 'state', options:{headerClass:"align-center",colClass:"align-center"}},
					 {title: 'zip', id: 'zip' , options:{headerClass:"align-center",colClass:"align-center"}},
					 {title: 'country', id: 'country', options:{headerClass:"align-right",colClass:"align-right"}},
				 ],
				 [
					 {title:<StateLess/>,options:{span:8}},
					 {title:"align-center",options:{headerClass:"align-center",colClass:"align-center"}},
					 {title:"align-right",options:{headerClass:"align-right",colClass:"align-right"}}
				 ],
			 ],
			 search: [
				 [
					 {title: 'userName', id: 'userName'},
					 {title: 'email', id: 'email'},
					 {title: 'namefst', id: 'namefst',options:{searchable:true}},
					 {title: 'namelst', id: 'namelst',options:{searchable:true}},
					 {title: 'street1', id: 'street1'},
					 {title: 'street2', id: 'street2'},
					 {title: 'city', id: 'city'},
					 {title: 'state', id: 'state'},
					 {title: 'zip', id: 'zip',options:{searchable:true}},
					 {title: 'country', id: 'country'},
				 ]
			 ],
			 sort: [
				 [
					 {title: 'userName', id: 'userName'},
					 {title: 'email', id: 'email'},
					 {title: 'namefst', id: 'namefst',options:{sortable:true}},
					 {title: 'namelst', id: 'namelst',options:{sortable:true}},
					 {title: 'street1', id: 'street1'},
					 {title: 'street2', id: 'street2'},
					 {title: 'city', id: 'city'},
					 {title: 'state', id: 'state'},
					 {title: 'zip', id: 'zip',options:{sortable:true}},
					 {title: 'country', id: 'country'},
				 ]
			 ],
			 sort_withgroup: [
				 [
					 {title:"User",options:{span:2,headerClass:"align-center"}},
					 {title:"Address",options:{span:8,headerClass:"align-center"}}
				 ],
				 [
					 {title: 'userName', id: 'userName'},
					 {title: 'email', id: 'email'},
					 {title: 'namefst', id: 'namefst',options:{sortable:true}},
					 {title: 'namelst', id: 'namelst',options:{sortable:true}},
					 {title: 'street1', id: 'street1'},
					 {title: 'street2', id: 'street2'},
					 {title: 'city', id: 'city'},
					 {title: 'state', id: 'state'},
					 {title: 'zip', id: 'zip',options:{sortable:true}},
					 {title: 'country', id: 'country'},
				 ]
			 ],
			 sort_withsearch: [
				 [
					 {title:"User",options:{span:2}},
					 {title:"Address",options:{span:8}}
				 ],
				 [
					 {title: 'userName', id: 'userName'},
					 {title: 'email', id: 'email'},
					 {title: 'namefst', id: 'namefst',options:{sortable:true, searchable:true}},
					 {title: 'namelst', id: 'namelst',options:{sortable:true, searchable:true}},
					 {title: 'street1', id: 'street1'},
					 {title: 'street2', id: 'street2'},
					 {title: 'city', id: 'city'},
					 {title: 'state', id: 'state'},
					 {title: 'zip', id: 'zip',options:{sortable:true,searchable:true}},
					 {title: 'country', id: 'country'},
				 ]
			 ],
}
;