import { db } from '@/db';
import { widgetStore } from '@/db/schema';
import { widgetLayout } from '@/types/widgets';
import { eq } from 'drizzle-orm';
import { NextRequest } from 'next/server';


export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const segments = url.pathname.split('/');
  const userid = segments[segments.length - 1]

  if(isNaN(Number(userid)) || !userid){
    const resp: response = {
      status: 400,
      message: "Invalid user id",
      data: null
    }
    return new Response(JSON.stringify(resp), { status: 400 })
  }

  const resp: response = {
    status: 200,
    message: "Success",
    data: null
  }
  const layout = await db.select().from(widgetStore).where(eq(widgetStore.userId, Number(userid))).limit(1);
  if(!layout.length){
    resp.status = 404
    resp.message = "Layout not found"
    return new Response(JSON.stringify(resp))
  }
  resp.data = layout[0]?.layout as widgetLayout
  return new Response(JSON.stringify(resp))
}
export async function POST(req: Request) {
    const resp: response = {
      status: 200,
      message: "Success",
      data: null
    };
    console.log(req);
    try {
      const body = await req.json();
      const { userid } = body;
      // Validate input structure here as needed
      if (!body.layout) {
        resp.status = 400;
        resp.message = "Missing layout data";
        return new Response(JSON.stringify(resp), { status: 400 });
      }
  
      // Check if layout already exists for this user
      const existingLayout = await db
        .select()
        .from(widgetStore)
        .where(eq(widgetStore.userId, Number(userid)))
        .limit(1);
      console.log("existingLayout",existingLayout)
      console.log(body.layout)
      if (existingLayout.length > 0) {
        // Update existing layout
        await db.update(widgetStore)
          .set({ layout: body.layout })
          .where(eq(widgetStore.userId, Number(userid)));
        resp.message = "Layout updated successfully";
      } else {
        // Insert new layout
        const inserted = await db.insert(widgetStore).values({
          userId: Number(userid),
          layout: body.layout
        }).returning();
  
        resp.data = inserted[0]?.layout as widgetLayout;
        resp.message = "Layout created successfully";
      }
  
      return new Response(JSON.stringify(resp));
    } catch {
      console.error("Error saving layout:");
      resp.status = 500;
      resp.message = "Internal server error";
      return new Response(JSON.stringify(resp), { status: 500 });
    }
  }
  
interface response{
    status: number,
    message: string
    data: widgetLayout|null
}