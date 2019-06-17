<template>
    <div class="city_body">
				<!-- <div class="city_list">
					<div class="city_hot">
						<h2>热门城市</h2>
						<ul class="clearfix">
							<li>上海</li>
						</ul>
					</div>
					<div class="city_sort">
						<div>
							<h2>A</h2>
							<ul>
								<li>阿拉善盟</li>
								<li>鞍山</li>
								<li>安庆</li>
								<li>安阳</li>
							</ul>
						</div>
					</div>
				</div>
				<div class="city_index">
					<ul>
						<li>A</li>
						<li>B</li>
						<li>C</li>
						<li>D</li>
						<li>E</li>
					</ul>
				</div> -->

                <div class="city_list">
                    <div class="city_hot">
						<h2>热门城市</h2>
						<ul class="clearfix">
                            <!-- key属性需要唯一值，因此找到id属性即可 -->
							<li v-for="item in hotList" :key="item.id">{{ item.nm }}</li>
						</ul>
					</div>
                    <!-- 分类 需要做两层的遍历-->
                    <div class="city_sort" ref="city_sort">
						<div v-for="item in cityList" :key="item.index">
							<h2>{{ item.index }}</h2>
							<ul>
                                <!-- 遍历 -->
								<li v-for="itemList in item.list" :key="itemList.id">{{ itemList.nm }}</li>
							</ul>
						</div>
					</div>
                </div>
                <!-- 索引值 -->
                <div class="city_index">
					<ul>
                        <!-- 前面的index是下标，相当于A=0，B=1……，和key里的index不一样，key里的index是ABCD -->
						<li v-for="(item,index) in cityList" :key="item.index" @touchstart="handleToIndex(index)">{{ item.index }}</li>
					</ul>
				</div>
			</div>
</template>

<script>
export default {
    name:'City',
    //为了将这些数据做成响应式的传进页面，因此可以用data
    data(){
        return {
            cityList: [],
            hotList: []
        }
    },
    mounted(){
        this.axios.get('/api/cityList').then((res)=>{
            //做一个数据判断，因为有可能数据是失败的
            var msg=res.data.msg;
            if(msg==='ok'){
                //暂时存一下城市数据
                var cities=res.data.data.cities;
                //分组  [{index:'A',list:[{nm:'阿城',id:123}]}]
                var {cityList,hotList} = this.formatCityList(cities);

                //映射
                this.cityList=cityList;
                this.hotList=hotList;
           }
        });
    },
    methods :{
        // 城市排版
        formatCityList(cities){
            //创建一个结果集
            var cityList=[];
            var hotList=[];
        
            //hotList热门城市.循环一下城市集合
            for(var i=0;i<cities.length;i++){
                if(cities[i].isHot === 1){
                    hotList.push( cities[i] );//因为不需要检索分类，所以直接push就可以了
                }
            }
            
            //循环找到第一个字母
            for(var i=0;i<cities.length;i++){
                var firstLetter=cities[i].py.substring(0,1).toUpperCase();
                //判断第一个字母是否在结果集当中
                if(toCom(firstLetter)){//新添加索引index
                    cityList.push({ index: firstLetter,list:[ { nm:cities[i].nm, id:cities[i].id } ]});
                }
                else{ //累加到已有索引index
                    for(var j=0;j<cityList.length;j++){
                        if(cityList[j].index === firstLetter){
                            cityList[j].list.push( { nm:cities[i].nm,id:cities[i].id } );
                        }
                    }
                }
            }

            //字母排序
            cityList.sort((n1,n2)=>{
                if( n1.index > n2.index ){
                    return 1;
                }
                else if(n1.index<n2.index){
                    return -1;
                }
                else{
                    return 0;
                }
            });


            function toCom(firstLetter){
                for(var i=0;i<cityList.length;i++){
                    if(cityList[i].index === firstLetter){
                        return false;
                    }
                }
                return true;
            }
           return { 
               cityList,
               hotList
           };

        },
        // 点击索引值跳转到对应的索引值里
        handleToIndex(index){
        var h2=this.$refs.city_sort.getElementsByTagName('h2');//因为点击对应的字母需要跳到对应的h2上
        // console.log(this.$refs.city_sort);
        this.$refs.city_sort.parentNode.scrollTop=h2[index].offsetTop;//滚动的位置等于h2的位置，parentNode是外层的city_list
         }
    }
}
</script>

<style scoped>
#content .city_body{ margin-top: 45px; display: flex; width:100%; position: absolute; top: 0; bottom: 0;}
.city_body .city_list{ flex:1; overflow: auto; background: #FFF5F0;}
.city_body .city_list::-webkit-scrollbar{
    background-color:transparent;
    width:0;
}
.city_body .city_hot{ margin-top: 20px;}
.city_body .city_hot h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
.city_body .city_hot ul li{ float: left; background: #fff; width: 29%; height: 33px; margin-top: 15px; margin-left: 3%; padding: 0 4px; border: 1px solid #e6e6e6; border-radius: 3px; line-height: 33px; text-align: center; box-sizing: border-box;}
.city_body .city_sort div{ margin-top: 20px;}
.city_body .city_sort h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
.city_body .city_sort ul{ padding-left: 10px; margin-top: 10px;}
.city_body .city_sort ul li{ line-height: 30px; line-height: 30px;}
.city_body .city_index{ width:20px; display: flex; flex-direction:column; justify-content:center; text-align: center; border-left:1px #e6e6e6 solid;}

</style>

