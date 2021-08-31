:-dynamic
% add declarations of predicates used in the agent program here. 
	in/1,			% matches the in/1 percept
	state/1,		% matches the state/1 percept
	zone/3,			% matches the zone/3 percept
	sequence/1,
	at/1,
	atBlock/1,
	color/2,
	holding/1,
	place/1,
	sequenceIndex/1,
	block/3.
	
% A room is a place with exactly one neighbour, i.e., there is only one way to get to and from that place.
room(PlaceID) :- zone(_,PlaceID,Neighbours), length(Neighbours,1).
