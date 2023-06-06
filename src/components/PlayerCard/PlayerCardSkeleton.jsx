import { Card, CardContent, Skeleton } from "@mui/material";

function PlayerCardSkeleton() {
  return ( 
    <Card>
      <Skeleton variant="rectangular" height={250}/>
      <CardContent>
        <Skeleton height={25}/>
      </CardContent>
    </Card>
   );
}

export default PlayerCardSkeleton;